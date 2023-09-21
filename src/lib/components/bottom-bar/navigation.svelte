<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { Globe2, Image, LayoutGrid, Settings } from 'lucide-svelte';
	import { animate } from 'motion';

	let hoverCircle: HTMLDivElement;

	function handleMouseEnter(e: any) {
		const padding = 4;
		animate(
			hoverCircle,
			{
				opacity: 1,
				x: e.target.offsetLeft + padding,
				y: e.target.offsetTop + padding,
				width: e.target.offsetWidth - padding * 2 + 'px',
				height: e.target.offsetHeight - padding * 2 + 'px'
			},
			{
				duration: 0.2
			}
		);
	}

	function handleMouseLeave() {
		animate(hoverCircle, { opacity: 0 }, { duration: 0.2 });
	}

	const paths = [
		{
			name: 'Photos',
			href: '/',
			icon: Image
		},
		{
			name: 'Albums',
			href: '/albums',
			icon: LayoutGrid
		},
		{
			name: 'Places',
			href: '/places',
			icon: Globe2
		},
		{
			name: 'Settings',
			href: '/settings',
			icon: Settings
		}
	];
</script>

<div class="rounded-full border border-muted backdrop-blur-md bg-card/70 relative">
	<div
		bind:this={hoverCircle}
		class="absolute rounded-full bg-secondary/80 pointer-events-none opacity-0 z-40"
	/>
	<div class="flex -space-x-2">
		{#each paths as path}
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href={path.href}
						on:mouseenter={handleMouseEnter}
						on:mouseleave={handleMouseLeave}
						class={cn(
							$page.url.pathname === path.href || $page.url.pathname.startsWith(path.href + '/')
								? '!text-primary'
								: '',
							'text-sm font-medium transition-colors hover:text-primary text-muted-foreground z-50 p-4 h-full hover:bg-inherit'
						)}
						{...builder}
						use:builder.action
					>
						<svelte:component this={path.icon} class="w-6 h-6" />
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{path.name}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
</div>
