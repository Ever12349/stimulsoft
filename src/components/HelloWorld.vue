<template>
  <div class="hello">
    <div class="from_container">
      <div class="form_item">
        <span class="form_label">输入标题</span>
        <input v-model="inputTitle" class="form_input" type="text" name id />
      </div>
      <div class="form_item">
        <span class="form_label">输入章节</span>
        <input v-model="inputChapter" class="form_input" type="text" name id />
      </div>
      <div class="form_item">
        <span class="form_label">输入文章</span>
        <textarea v-model="inputArticle" class="form_textArea" name id cols="30" rows="10"></textarea>
      </div>
      <div class="form_submit">
        <div @click="setAjax('pdf')" class="open_pdf">打开pdf</div>
        <div @click="setAjax('mdc')" class="open_mdc">打开mdc</div>
      </div>
    </div>
  </div>
</template>

<script>
// const baseUrl = "http://localhost:3000";
const baseUrl = process.env.VUE_APP_API;
window.console.log(baseUrl);
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      inputTitle: "",
      inputChapter: "",
      inputArticle: ""
    };
  },
  methods: {
    setAjax(data) {
      if (this.inputTitle && this.inputChapter && this.inputArticle) {
        axios
          .post(`${baseUrl}/get_report_view`, {
            title: this.inputTitle,
            chapter: this.inputChapter,
            article: this.inputArticle
          })
          .then(res => {
            window.console.log("setAjax(", data, res);
            if (data === "pdf") {
              const url = res.data.data.pdf_url;
              window.open(url);
            } else {
              const url = res.data.data.mdc_url;
              window.console.log(url);
              sessionStorage.mdc_url = url;
              window.open("report.html");
            }
          });
      } else {
        alert("请输入数据");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.from_container {
  margin: 0 auto;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: #99ffff;
}

.form_item {
  display: flex;
  margin: 5px 10px;
  align-items: flex-start;
  font-size: 14px;
  /* height: 100%; */
}

.form_label {
  width: 20%;
  background-color: #ff6600;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 30px;
  color: #fff;
  height: 100%;
  /* border-top-left-radius: 4px; */
  /* border-bottom-left-radius: 4px; */
  /* height: 24px; */
}
.form_input {
  width: 80%;
  flex: 1;
  height: 30px;
  /* border-top-right-radius: 4px; */
  /* border-bottom-right-radius: 4px; */
}

.form_textArea {
  flex: 1;
}

.form_submit {
  display: flex;
  background-color: #f5f5f5;
  margin: 0 10px;
  /* padding: 5px 10px; */
  /* border: 1px solid #ccc; */
  height: 30px;
  cursor: pointer;
}

.open_pdf,
.open_mdc {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 1px solid #ccc;
}

.open_pdf {
  background-color: aqua;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
