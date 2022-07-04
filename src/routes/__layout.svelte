<script>
    import "../app.css";
</script>

<div>
    <header class="py-3 px-6 bg-blue-900 text-white">
        <a href="/"class="font-bold">Sports tracker</a>
    </header>
    <div class="w-full py-3 px-6 border-b border-gray-100">
        <div class="container mx-auto">
            <ul class="flex gap-3 items-center">
                <li><a href="/" class="text-gray-600 hover:underline">Upcoming games</a></li>
                <li><a href="/games/create" class="text-gray-600 hover:underline">Create a game</a></li>
            </ul>
        </div>
    </div>
    <main>
        <slot />
    </main>


    <footer class="bg-gray-50 py-24">
        <div class="container mx-auto">
            <p class="text-gray-600 text-sm">Sports game stats tracker build by Jens van Wijhe</p>
        </div>
    </footer>
</div>
