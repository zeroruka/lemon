<script lang="ts">
	import Actions from './actions.svelte';
	import Navigation from './navigation.svelte';
	import ServerStatus from './server-status.svelte';
	import UserNav from './user-nav.svelte';
</script>

<div class="absolute left-4 right-4 bottom-4 flex justify-between">
	<ServerStatus />

	<div class="flex space-x-2">
		<Navigation />
		<Actions />
	</div>

	<UserNav />
</div>
