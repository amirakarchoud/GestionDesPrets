<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div class="division l-side">
      <div class="milieu">
        <img src="img/admin.png" alt="Avatar admin" />
        <div
          class="row justify-content-center"
          style="height: 80%; display: flex; justify-content: center"
        >
          <div
            class="col-md-3"
            style="
              display: flex;
              justify-content: center;
              opacity: 1 !important;
            "
          >
            <router-link to="/admin">
              <button
                class="bouton"
                style="margin-top: 50%; margin-bottom: 50%"
              >
                Gestionnaire
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="center-div">
      <img
        src="img/logo_sans_bg.png"
        alt="logo lipn"
        height="50px"
        weight="50px"
      />
    </div>
    <div class="division r-side">
      <div class="milieu">
        <img src="img/user.png" alt="Avatar user" />
        <div class="col-md-3" style="display: flex; justify-content: center">
          <router-link to="/membre">
            <button
              class="bouton"
              style="margin-top: 50%; margin-bottom: 50%; margin-left: 48%"
            >
              Membre
            </button></router-link
          >
        </div>
      </div>
    </div>
        
  </div>
</template>

<style>
.division {
  height: 100%;
  width: 50%;
  position: fixed;
  /* z-index: 1; */
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.l-side {
  left: 0;
  /* background: linear-gradient(to right, #4568dc, #b06ab3); */
  background: #4568dc;
}

/* Control the right side */
.r-side {
  right: 0;
  /* background: linear-gradient(to right, #be93c5, #7bc6cc); */
  background: #abbaea;
  /* background: #9370db; */
}

/* the content is centered horizontally and vertically */
.milieu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* Style the image inside the centered container*/
.milieu img {
  width: 150px;
  border-radius: 50%;
}
.bouton {
  padding: 20px 40px;
  font-size: larger;
  color: white;
  outline: none;
  background: transparent;
  cursor: pointer;
  border: solid 2px white;
  text-decoration: none;
  border-radius: 5px;
}
.center-div {
  border-radius: 9999px;
  height: 150px;
  width: 150px;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40%;
}
</style>
