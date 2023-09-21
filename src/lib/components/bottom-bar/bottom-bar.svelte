<script lang="ts">
	import Actions from './actions.svelte';
	import Navigation from './navigation.svelte';
	import ServerStatus from './server-status.svelte';
	import UserNav from './user-nav.svelte';
</script>

<div class="fixed bottom-0 w-full flex justify-between p-4">
	<ServerStatus />

	<div class="flex space-x-2">
		<Navigation />
		<Actions />
	</div>

	<UserNav />
</div>
