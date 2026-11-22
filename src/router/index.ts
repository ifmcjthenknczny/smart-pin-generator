import { createRouter, createWebHistory } from 'vue-router'
import PinPage from '@/views/PinPage.vue'
import PatternPage from '@/views/PatternPage.vue'
import { defineComponent } from 'vue'

const EmptyView = defineComponent({
  name: 'EmptyView',
  render: () => null,
})

// TODO: create mutual page layout for pin and pattern

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: EmptyView },
    { path: '/pin', name: 'pin', component: PinPage },
    { path: '/pattern', name: 'pattern', component: PatternPage },
  ],
})
