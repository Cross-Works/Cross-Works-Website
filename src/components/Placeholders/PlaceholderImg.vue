<template>
    <div class="placeholder-img">
        <slot>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="8" fill="#b2dfdb"/>
                <path d="M12 36l8-10 6 8 8-12 8 14H12z" fill="#26a69a"/>
                <circle cx="16" cy="18" r="3" fill="#26a69a"/>
            </svg>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'PlaceholderImg'
}
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;
.placeholder-img {
    background-color: #eaeaea;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 8px;
    height: 240px;
    color: $xw-teal-dark;
    padding: $spacing-md;
    transition: background-color 0.2s;
}
</style>