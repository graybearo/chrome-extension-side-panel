export type Messages = {
	GET_CURRENT_TAB: { input: void; output: { id?: number; title: string; url: string } | null };
	GET_VIEW_COUNT: { input: void; output: { count: number } };
	BUMP_VIEW_COUNT: { input: void; output: { count: number } };
};