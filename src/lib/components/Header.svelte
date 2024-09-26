<script lang="ts">
    import iconMenu from "../images/icon_menu.svg"
    import iconClose from "../images/icon_close.svg"
    import iconSettings from "../images/icon_settings.svg"

    import { navigationData } from "$lib/utils/navigationData"
</script>

<header class="header glass">
    <!-- Mobile only -->
    <div class="header__icons">
        <button class="button button--naked">
            <img src={iconMenu} alt="Menu" class="button__icon" />
        </button>

        <button class="button button--naked">
            <img src={iconSettings} alt="Settings" class="button__icon" />
        </button>
    </div>

    <nav class="nav">
        <!-- Common elements -->
        <ul class="nav__list">
            {#each navigationData as navItem}
                <li class="nav__list-item">
                    <a href={navItem.address} class="nav__link">
                        {navItem.name}
                    </a>
                </li>
            {/each}
        </ul>

        <!-- Tablet/desktop only -->
        <div class="account">
            <button class="button button--naked account__log-in">Log in</button>
            <button class="button button--naked account__sign-up"
                >Sign up</button
            >
        </div>
    </nav>
</header>

<style>
    .header {
        padding-block-start: 0.75rem;

        display: grid;
        row-gap: 1rem;
    }

    .header__icons {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-inline: 0.75rem;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: start;
    }

    .nav__list {
        flex: 1;

        display: flex;
        justify-content: space-between;
    }

    .nav__list-item {
        flex: 1;

        display: flex;
        justify-content: center;
    }

    .nav__list-item:where(:last-child) {
        /* The Settings link is not shown on mobile, a button is displayed instead */
        display: none;
    }

    .nav__link {
        padding-block-end: 1rem;

        position: relative;

        font-size: var(--font-size-100);
    }

    /* TODO: a sliging active link indicator on mobile */

    .nav__link::before {
        content: "";
        position: absolute;
        height: 3px;
        bottom: 0px;
        left: 50%;
        right: 50%;

        background-color: var(--color-primary-400);

        transition: 150ms ease-in;
    }

    .nav__link:hover::before {
        inset-inline: 0px;
    }

    .account {
        display: none;

        gap: 2.5rem;

        font-size: var(--font-size-200);
        font-weight: var(--font-weight-bold);
    }

    @media screen and (width > 40rem) {
        .header {
            padding-block-start: 1rem;
            padding-inline: 4rem;
        }

        .header__icons {
            display: none;
        }

        .nav__list {
            justify-content: start;
            gap: 2.5rem;
        }

        .nav__list-item {
            flex: 0;
            display: flex;
        }

        .nav__link {
            font-size: var(--font-size-200);
        }

        .account {
            display: flex;
        }
    }

    @media screen and (width > 64rem) {
        .header {
            padding-inline: 8rem;
        }

        .nav__list,
        .account {
            gap: 3rem;
        }

        .nav__link {
            font-size: var(--font-size-300);
        }

        .account {
            font-size: var(--font-size-300);
        }
    }
</style>
