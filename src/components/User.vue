<template>
  <div>
    <h1>User Profile</h1>
    <div>GLO-3102 User Profile page</div>
    <div>
      <div>
        <h2>Justin Trudeau</h2>
      </div>
      <div>
        User score: 4.5 / 5
      </div>
    </div>

    <div>

      <!-- list of visited restaurants -->
      <ul>
        <li>
          <h4>Restaurant Normandin Neufchatel</h4>
          <div>
            <h6>visited 93432 times</h6>
          </div>
        </li>

        <li>
          <h4>London Jack</h4>
          <div>
             <h6>visited  3 times</h6>
          </div>
        </li>

        <li>
          <h4>Le Ciel</h4>
          <div>
             <h6>visited  5 times</h6>
          </div>
        </li>

        <li>
          <h4>MacDonalds</h4>
          <div>
             <h6>visited  398 times</h6>
          </div>
        </li>

      </ul>
    </div>

    <div>
       <router-link :to="{ name: 'Home' }">HOME PAGE</router-link>
    </div>

  </div>
</template>

<style></style>
