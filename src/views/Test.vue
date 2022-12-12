<template>
  <div style="width: 460px">
    <el-cascader
      style="width: 100%"
      :options="options"
      v-model="selectedOptions"
      @change="addressChoose"
    ></el-cascader>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    return {
      // 省市区级联
      options: regionData,
      selectedOptions: [],
    };
  },
  created() {
    // this.getCity();
  },
  methods: {
    /**省市区三级联动 */
    addressChoose(value) {
      console.log(
        "省市区：",
        CodeToText[value[0]],
        CodeToText[value[1]],
        CodeToText[value[2]]
      );
      // this.form.province = CodeToText[value[0]];
      // this.form.city = CodeToText[value[1]];
      // this.form.area = CodeToText[value[2]];
      // 省市区转换
      // let province = this.form.province;
      // let city = this.form.city;
      // let area = this.form.area;
      // let arg1 = TextToCode[province].code;
      // let arg2 = TextToCode[province][city].code;
      // let arg3 = TextToCode[province][city][area].code;
      // this.selectedOptions.push(arg1, arg2, arg3);
    },
  },
};
</script>