<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal, Search } from 'lucide-svelte';
</script>

<div class="rounded-full border border-muted backdrop-blur-md bg-card/70 relative">
	<div class="flex -space-x-2">
		<Button
			variant="ghost"
			class="text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-4 h-full hover:bg-inherit"
		>
			<Search class="w-6 h-6" />
		</Button>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					class="text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-4 h-full hover:bg-inherit"
				>
					<MoreHorizontal class="w-6 h-6" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item>Upload Photo</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>New Album</DropdownMenu.Item>
					<DropdownMenu.Item>New Tag Album</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Copy Shareing Link</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
