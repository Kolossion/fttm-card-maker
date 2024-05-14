<script>
	// your script goes here
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Menubar from '$lib/components/ui/menubar';
</script>

<!-- markup (zero or more items) goes here -->
<header class="w-full">
	<Menubar.Root class="w-full">
		<Menubar.Menu>
			<Menubar.Trigger>Card</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>New Incognito Window</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Sub>
					<Menubar.SubTrigger>Share</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Item>Email link</Menubar.Item>
						<Menubar.Item>Messages</Menubar.Item>
						<Menubar.Item>Notes</Menubar.Item>
					</Menubar.SubContent>
				</Menubar.Sub>
				<Menubar.Separator />
				<Menubar.Item>
					Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Database</Menubar.Trigger>
		</Menubar.Menu>
	</Menubar.Root>
</header>

<style>
	/* your styles go here */
	header {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem 1rem 0 1rem;
	}
</style>
