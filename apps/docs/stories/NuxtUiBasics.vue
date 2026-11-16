<script setup lang="ts">
/** Nuxt UI's own components, unchanged, wearing the Selvage theme. */
import { ref } from 'vue'

const query = ref('')
</script>

<template>
  <div class="basics">
    <section aria-labelledby="buttons">
      <h2 id="buttons">Button</h2>
      <div class="row">
        <UButton label="Approve" />
        <UButton label="Fork here" color="neutral" variant="outline" icon="i-lucide-git-fork" />
        <UButton label="Replay" color="neutral" variant="soft" icon="i-lucide-history" />
        <UButton label="Disabled" disabled />
      </div>
    </section>

    <section aria-labelledby="inputs">
      <h2 id="inputs">Input</h2>
      <UFormField label="Search a run" help="Searches titles and briefs.">
        <UInput v-model="query" icon="i-lucide-search" placeholder="Why is production stuck?" class="w-80" />
      </UFormField>
    </section>

    <section aria-labelledby="badges">
      <h2 id="badges">Badge</h2>
      <div class="row">
        <UBadge label="read" />
        <UBadge label="irreversible" color="primary" variant="solid" icon="i-lucide-lock" />
        <UBadge label="f52872e" variant="outline" class="font-mono" />
      </div>
    </section>

    <section aria-labelledby="cards">
      <h2 id="cards">Card</h2>
      <UCard class="max-w-sm">
        <template #header>
          <p class="font-semibold text-sm text-thread-ci-text">CI</p>
        </template>
        <p class="text-sm">Reads the repository's checks.</p>
        <p class="mt-1 font-mono text-xs text-muted">get_file_contents ×2</p>
        <template #footer>
          <div class="flex justify-between text-xs text-muted">
            <span>done</span><span class="font-mono">9.8 s</span>
          </div>
        </template>
      </UCard>
    </section>
  </div>
</template>

<style scoped>
.basics {
  display: grid;
  gap: var(--space-8);
}

h2 {
  margin: 0 0 var(--space-3);
  font: var(--font-weight-semibold) var(--text-md) / 1.2 var(--font-sans);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}
</style>
