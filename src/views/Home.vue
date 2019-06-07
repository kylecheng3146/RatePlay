<template>  
<div id="app" class="container">
	<div class="row main-container mx-auto">
		<div class="row title-container no-gutters">
			<div class="col-10">
				<h1 class="title">匯率換算</h1>
			</div>
			<div class="col-2">
				<select class="select-country" @change="updateInputs" v-model="selected">
					<option v-for="country in countries">{{country.name}}</option>
				</select>
			</div>
		</div>
		
		<div class="row">
			<!-- input field 1 -->
			<div class="col">
				<img class="country-flag" :src="imageSrc + 'TW/flat/64.png' "/>
				<h2 class="country-name">台灣</h2>
				<p>匯率: 1 TWD</p>
				<input id="currencyInput" class="currency-input" @keyup="calcInput_1" :value="calc2">
			</div>
			<!-- input field 2 -->
			<div class="col">
				<template v-for="country in countries">
					<template v-if="selected === country.name" v-model="countryRate">
						<img class="country-flag" :src="imageSrc + country.image"/>
						<h2 class="country-name">{{country.name}}</h2>
						<p class="">匯率: {{country.rate}} {{country.money}}</p>
						<input class="currency-input" @keyup="calcInput_2" :value="calc1">
					</template>
				</template>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'usage',
  data () {
    return {
    selected: "Brazil",
		countryRate: 2.5,
		calc2: "",
		calc1: "",
		imageSrc: "https://www.countryflags.io/",
		firstInputSelected: true,
		input: document.getElementById("currencyInput"),
		countries: [
			{
				name: "巴西",
				money: "Reais",
				rate: 2.5,
				image: "BR/flat/64.png"
			},
			{
				name: "德國",
				money: "Euro",
				rate: 0.67,
				image: "DE/flat/64.png"
			},
			{
				name: "美國",
				money: "USD",
				rate: 30,
				image: "US/flat/64.png"
			},
			{
				name: "加拿大",
				money: "CAD",
				rate: 0.94,
				image: "CA/flat/64.png"
			},
			{
				name: "紐西蘭",
				money: "NZD",
				rate: 1.09,
				image: "NZ/flat/64.png"
			},
			{
				name: "日本",
				money: "YEN",
				rate: 88.51,
				image: "JP/flat/64.png"
			}
		]
    }
  },
  components: {
  },
	methods: {
		calcInput_1: function(e, rate){
      this.firstInputSelected = true;
			this.calculate(e, rate);
		},
		calcInput_2: function(e, rate){
      this.firstInputSelected = false;
			this.calculate(e, rate);
		},
		updateInputs: function(){
      var selected;
			for(var i = 0; i < this.countries.length; i++){
				if(this.selected == this.countries[i].name){
					selected = this.countries[i];
				}
			}
			this.countryRate = selected.rate;
			var input2 = parseFloat(document.getElementById("currencyInput").value);
			if(isNaN(input2)){
				this.calc2 = "";
				this.calc1 = "";
				return;
			}
			this.calc1 = (input2 * this.countryRate).toFixed(2);
		},
		calculate: function(e, value){
			value = parseFloat(e.target.value);
			if(isNaN(value)){
				this.calc2 = "";
				this.calc1 = "";
				return;
			}
			
			if(this.firstInputSelected){
				this.calc2 = value;
				this.calc1 = (value * this.countryRate).toFixed(2);
			} else {
				this.calc1 = value;
				this.calc2 = (value / this.countryRate).toFixed(2);
			}
		}
	}
}
</script>