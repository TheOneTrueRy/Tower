<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

      </div>
      <div class="col-12">
        <div class="row">

        </div>
      </div>
      <div class="col-3 p-2 mt-3 event">
        <div class="event-top"></div>
        <div class="event-bottom p-1 text-light d-flex flex-column justify-content-end">
          <span><b>Event Name</b></span>
          <span>Event Location</span>
          <span>Event Date</span>
          <span class="text-end"><b>200</b> Spots Left</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {

    }
  }
}
</script>

<style scoped lang="scss">
.event {
  height: 300px;
  width: 300px;
}

.event-top {
  height: 65%;
}

.event-bottom {
  height: 35%;
  background-color: rgba(255, 255, 255, 0.203);
}
</style>
