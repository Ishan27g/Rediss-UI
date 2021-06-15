<template>
  <div class="home">
    <div class="p-grid p-jc-around">
      <div class="p-col-12" style="font-style: oblique">
        {{ serverResponse }}
      </div>
      <div class="p-col-4">
        <InputText type="text" placeholder="Key" v-model="key" />
        <InputText type="text" placeholder="Value" v-model="value" />
        <Button label="Add" @click="add" />
      </div>
      <div class="p-col-4">
        <InputText type="text" placeholder="Key" v-model="key" />
        <Button label="Get" @click="get" />
      </div>
      <div class="p-col-4">
        <InputText type="text" placeholder="Key" v-model="key" />
        <Button label="Delete" @click="del" />
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-for="msg in allData" :key="msg.keys">
        {{ msg.keys }} - {{ msg.values }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import "primeflex/primeflex.css";

export default defineComponent({
  name: "Home",
  data() {
    return {
      connection: null,
    };
  },
  setup() {
    const key = ref("");
    const value = ref("");
    const serverResponse = ref("");
    const allData = ref(getMsg("").data);

    var time = new Date().getTime()

    function getMsg(msg: string) {
      return {
        data: [
          {
            keys: key.value,
            values: msg,
          },
        ],
      };
    }

    console.log("Starting connection to WebSocket Server");
    var connection = new WebSocket("ws://localhost:9001/ws");
    connection.onerror = function (event) {
      serverResponse.value = "Could not connect websocket server...";
    };
    connection.onmessage = function (event) {
      allData.value = getMsg(event.data).data;
      key.value = "";
      value.value = "";
      var duration = time - new Date().getTime()
      serverResponse.value = duration + "ms"
    };
    connection.onopen = function (event) {
      serverResponse.value = "Connected...";
    };

    function sendCmd(cmd: string) {
      console.log(cmd);
      time = new Date().getTime()
      connection.send(cmd);
    }
    function add() {
      console.log("Add");
      sendCmd(">" + key.value + "=" + value.value);
    }
    function get() {
      console.log("Get");
      sendCmd("<" + key.value);
    }
    function del() {
      console.log("Del");
      sendCmd("-" + key.value);
    }
    return {
      key,
      value,
      add,
      get,
      del,
      allData,
      serverResponse,
    };
  },
});
</script>
