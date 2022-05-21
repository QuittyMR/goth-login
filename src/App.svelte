<script lang="ts">
    import {fly} from 'svelte/transition';
    import visibilityIcon from './assets/icons/visibility.svg';
    import visibilityOffIcon from './assets/icons/visibilityOff.svg';
    import BackIcon from './lib/Back.svelte';
    import Validator from "./lib/Validator.svelte";

    // Startup options
    let isRegisterMode = false;
    let isPasswordShown = false;

    let passwordField: HTMLInputElement;
    let email: string;
    let password: string;

    function changePasswordVisibility() {
        isPasswordShown = !isPasswordShown;
        passwordField.type = passwordField.type === 'text' ? 'password' : 'text';
    }

    $: passwordIcon = isPasswordShown ? visibilityIcon : visibilityOffIcon;
</script>

<div id="background">
    <div class="theme-custom">
        <div id="card">
            <div
                    id="back"
                    on:click={() => (isRegisterMode = false)}
                    class="transition-slow {isRegisterMode ? 'opacity-80' : 'opacity-0'}">
                <BackIcon/>
            </div>
            <div id="content" class="flex flex-col gap-y-10 w-max">
                <div id="logo-row" class="text-center block -mb-4">
                    <img src="/src/assets/logo.jpg" alt="logo"/>
                </div>
                <div id="inputs" class="space-y-4 block w-80 text-black">
                    <input id="email" class="hover:ring-2 block w-80" placeholder="E-Mail" bind:value={email}/>
                    <div id="password" class="inline-table w-80">
                        <input
                                class="hover:ring-2 inline w-80"
                                bind:this={passwordField}
                                placeholder="Password"
                                type="password"
                                bind:value={password}/>
                        <img
                                src={passwordIcon}
                                alt="show/hide password"
                                class="inline w-8 -m-10 cursor-pointer opacity-70"
                                on:click={changePasswordVisibility}/>
                    </div>
                </div>
                <div id="swappable" class="block h-8 my-[-2rem]">
                    <div class="block w-full">
                        {#if isRegisterMode}
                            <div transition:fly|local={{ duration: 1000, x: 40 }} class="absolute min-w-min">
                                <Validator ruleSet="email" value={email}/>
                                <Validator ruleSet="password" value={password}/>
                            </div>
                        {:else}
                            <div transition:fly={{ duration: 1000, x: 40 }} class="absolute -my-1 h-8">
                                <label class="text-sm">
                                    <input type="checkbox"/>
                                    Remember me
                                </label>
                            </div>
                        {/if}
                    </div>
                </div>
                <div id="controls" class="col-span-3 col-start-1 grid gap-4">
                    <div
                            id="login-button"
                            class="col-span-3 grid grid-cols-1 transition-slow
                        {isRegisterMode ? 'translate-y-32 opacity-0' : ''}">
                        <button
                                class="text-contrast col-span-3 transition-fast rounded-3xl bg-primary p-3 font-bold ring-secondary hover:ring-4"
                        >Log in
                        </button>
                        <a
                                href="."
                                id="input-supplemental"
                                class="w-max justify-self-end hover:text-primary transition-fast">
                            Forgot password?
                        </a>
                    </div>
                    <div
                            id="separator"
                            class="col-span-3 grid grid-cols-3 place-items-center transition-slow {isRegisterMode
                            ? 'scale-x-0'
                            : ''}">
                        <div class="line"></div>
                        <div>Or</div>
                        <div class="line"></div>
                    </div>
                    <button
                            on:click={() => (isRegisterMode = true)}
                            class=" col-span-3 w-full rounded-3xl border-[1px] border-primary/50 p-3 font-bold transition-slow ring-secondary hover:ring-4 z-50 {isRegisterMode
                            ? 'bg-primary'
                            : 'duration-400'}"
                    >Sign Up
                    </button>
                    <div
                            on:click={() => (isRegisterMode = false)}
                            class="cursor-pointer  transition-slow {isRegisterMode ? '' : 'opacity-0'}">
                        back to Log in
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    #card {
        @apply min-w-max rounded-md border-[1px] border-primary/50 bg-slate-200/10 m-5 p-5 shadow-xl;
    }

    #background {
        @apply flex flex-none items-center justify-center h-screen bg-neutral-800 text-text;
    }

    #back {
        @apply cursor-pointer shadow rounded-md fixed -m-5;
    }

    #logo-row img {
        @apply rounded-full shadow-xl border-2 border-primary/30 inline-block;
    }

    #inputs input {
        @apply rounded border-[1px] border-primary/50 p-3 ring-secondary duration-300;
    }

    .transition-slow {
        @apply transition-all duration-1000;
    }

    .transition-fast {
        @apply transition-all duration-300;
    }

    .line {
        @apply border-t-2 border-secondary mt-1 mx-4 w-full;
    }
</style>
