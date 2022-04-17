<template>
  <div class="container">
    <div class="about fade-in p-1">
      <h2>About Page</h2>
      <p>A Movie List Web App Created By Benediktus Aprianto</p>
      <p>API List</p>
      <ul>
        <li>POST '/api/login/'</li>
        <li>POST '/api/register/'</li>
        <li>GET '/api/logout/'  (Need LoggedIn)</li>
        <li>GET '/api/films/' (Show all Film List)</li>
        <li>POST '/api/films/'  (Post New Film, Need LoggedIn, RoleCheck)</li>
        <li>GET '/api/films/{id}'  (Get Film Details by ID)</li>
        <li>PUT '/api/films/{id}'  (Update Film by ID, Need LoggedIn, RoleCheck)</li>
        <li>DELETE '/api/films/{id}'  (Delete Film by ID, Need LoggedIn)</li>
        <li>GET '/api/statuses/' (Get Film Sorted by Status)</li>
        <li>GET '/api/statuses/{id}' (Show Film Sorted by Status Using Status_id as Parameter)</li>
        <li>GET '/api/favorites/' (Show all Fav and Ratings from All User and All Movie, Need LoggedIn, RoleCheck)</li>
        <li>POST '/api/favorites/'  (Create a Relationship between User and Film and also Save Fav and Ratings, Need LoggedIn)</li>
        <li>GET '/api/favorites/{id}'  (Get All Created Relationship between User and Film regardless of the Fav and Ratings Value, Need LoggedIn)</li>
        <li>GET '/api/favorites/{id}/fav' (Get All Created Relationship between User and Film filtered by Fav Value, Need LoggedIn)</li>
        <li>PUT '/api/favorites/'  (Update Fav and Ratings Value by Relational Pivot Table ID)</li>
      </ul>
      <p>Frontend Hosted on Netlify <a href="https://ben-movie-app.netlify.app/" target="_blank">https://ben-movie-app.netlify.app/</a></p>
      <p>Backend Hosted on Heroku <a href="https://ben-movie-apps.herokuapp.com/" target="_blank">https://ben-movie-apps.herokuapp.com/</a></p>
    </div>
  </div>  
</template>

<style scoped>
.about{
  margin: 0 auto;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.80);
    width: 50%;
    padding: 0 0 38px;
    border-radius: 4px;
    position: relative;
}
.about ul li{
  text-align: left;
}
</style>
