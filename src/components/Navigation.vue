<template>
  <nav>
    <router-link to="/">
      <Brand />
    </router-link>
    <Search />
  </nav>
</template>

<script>
// TODO
/*
 * ✔️ Lien vers la page d'accueil
 * ✔️ Barre de recherche
 * Le nom de l'utilisateur courant si connecté
 * Lien vers le profil de l'usager si connecté
 * Lien pour se connecter/déconnecter
 */

import Brand from '@/components/Navigation/Brand.vue'
import Search from '@/components/Navigation/Search.vue'

export default {
  components: {
    Brand,
    Search
  }
}
</script>
