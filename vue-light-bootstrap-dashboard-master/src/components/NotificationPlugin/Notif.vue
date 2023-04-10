<template>
</template>

<script>

export default {
  name: "Notif"
}
const clickHandler = function(success) {
  console.log(`The button has been clicked success times!`)
  this.$toast(Notif, {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: false,
    rtl: false
  });
}

</script>

<style scoped>

</style>
