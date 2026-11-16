/** The agent threads. Each is one colour, the same everywhere it appears. */
export type ThreadName = 'supervisor' | 'ci' | 'deploy' | 'config' | 'synthesis' | 'gate'

/** Where a thread is. Always said in words too, never by colour alone. */
export type ThreadState = 'idle' | 'running' | 'done' | 'failed'

/** The three answers a person can give at the gate. */
export type GateDecision = 'approve' | 'correct' | 'reject'

export const THREAD_NAMES: readonly ThreadName[] = [
  'supervisor',
  'ci',
  'deploy',
  'config',
  'synthesis',
  'gate',
]
