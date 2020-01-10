<template>
  <div id="app">
		<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
::-webkit-scrollbar-track{
	background-color: rgba(0,0,0,.1);
	border-radius: 0;
}
::-webkit-scrollbar{
	-webkit-appearance: none;
	width: 5px;
	/* height: 5px; */
}
::-webkit-scrollbar-thumb{
	cursor: pointer;
	border-radius: 5px;
	background-color: rgba(0,0,0,.2);
	transition: color .2s ease;
}
</style>
