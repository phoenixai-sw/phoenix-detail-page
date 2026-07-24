"use client";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

export type CloudUser = { id: string; email: string };

export type CloudProjectSummary = {
  local_id: string;
  title: string;
  channel: string | null;
  ratio: string | null;
  model: string | null;
  request: string | null;
  created_at: string;
  updated_at: string;
};

export type CloudProjectRow = CloudProjectSummary & { sections: unknown };

export type CloudProjectPayload = {
  localId: string;
  title: string;
  channel: string;
  ratio: string;
  model: string;
  request: string;
  sections: unknown;
};

let cachedClient: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cachedClient = url && anonKey
    ? createClient(url, anonKey, {
        auth: { flowType: "pkce", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;
  return cachedClient;
}

export function isCloudConfigured() {
  return Boolean(getSupabase());
}

function toCloudUser(user: User | null | undefined): CloudUser | null {
  return user ? { id: user.id, email: user.email || "" } : null;
}

export function subscribeCloudUser(onChange: (user: CloudUser | null) => void) {
  const supabase = getSupabase();
  if (!supabase) {
    onChange(null);
    return () => {};
  }
  supabase.auth.getSession().then(({ data }) => onChange(toCloudUser(data.session?.user)));
  const { data } = supabase.auth.onAuthStateChange((_event, session) => onChange(toCloudUser(session?.user)));
  return () => data.subscription.unsubscribe();
}

function requireSupabase() {
  const supabase = getSupabase();
  if (!supabase) throw new Error("클라우드 저장이 아직 설정되지 않았습니다.");
  return supabase;
}

export async function signInWithGoogle() {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/studio` }
  });
  if (error) throw new Error(error.message);
}

export async function signOutCloud() {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function upsertCloudProject(payload: CloudProjectPayload) {
  const supabase = requireSupabase();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("클라우드 저장은 Google 로그인 후 사용할 수 있습니다.");

  const { error } = await supabase.from("projects").upsert(
    {
      user_id: userData.user.id,
      local_id: payload.localId,
      title: payload.title,
      channel: payload.channel,
      ratio: payload.ratio,
      model: payload.model,
      request: payload.request,
      sections: payload.sections,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,local_id" }
  );
  if (error) throw new Error(error.message);
}

export async function listCloudProjects(): Promise<CloudProjectSummary[]> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("local_id,title,channel,ratio,model,request,created_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function fetchCloudProject(localId: string): Promise<CloudProjectRow | null> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("local_id,title,channel,ratio,model,request,sections,created_at,updated_at")
    .eq("local_id", localId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCloudProject(localId: string) {
  const supabase = requireSupabase();
  const { error } = await supabase.from("projects").delete().eq("local_id", localId);
  if (error) throw new Error(error.message);
}
