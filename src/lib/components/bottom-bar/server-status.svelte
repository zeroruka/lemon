<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Citrus } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
</script>

<div class="rounded-full border border-muted backdrop-blur-md bg-card/70 relative overflow-hidden">
	<Popover.Root>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="ghost"
				class="text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-4 h-full hover:bg-inherit"
			>
				<Citrus class="w-6 h-6" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="ml-2">Server Status: Good</Popover.Content>
	</Popover.Root>
</div>
