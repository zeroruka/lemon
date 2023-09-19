<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { User } from 'lucide-svelte';
</script>

<div class="rounded-full border border-muted backdrop-blur-md bg-card/70 overflow-hidden relative">
	<DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				variant="ghost"
				builders={[builder]}
				class="text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-0 h-full hover:bg-inherit"
			>
				<Avatar.Root class="h-14 w-14">
					<Avatar.Image src="" alt="@shadcn" />
					<Avatar.Fallback class=" bg-transparent">
						<User class="w-6 h-6" />
					</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{$page.data.user.username}</p>
					<p class="text-xs leading-none text-muted-foreground">m@example.com</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>Profile</DropdownMenu.Item>
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<a href="/api/signout"> <DropdownMenu.Item>Log out</DropdownMenu.Item></a>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
