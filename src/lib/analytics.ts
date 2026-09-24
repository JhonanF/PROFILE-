// Analytics abstraction — connect to Supabase / Firebase / Cloudflare when ready
// Mock data is clearly labeled and isolated here

const MOCK_VIEW_COUNT = 42;

export async function getProfileViews(): Promise<number> {
  // TODO: Replace with real backend call
  // Example Supabase:
  // const { data } = await supabase.from('views').select('count').single();
  // return data?.count ?? 0;

  // Example Cloudflare KV:
  // const res = await fetch('/api/views');
  // const json = await res.json();
  // return json.count;

  return Promise.resolve(MOCK_VIEW_COUNT);
}

export function formatViewCount(count: number): string {
  return count.toString().padStart(6, "0");
}
