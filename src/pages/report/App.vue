<template>
  <div id="viewer"></div>
</template>

<script>
// import "./assets/js/stimulsoft.reports.js";
// import "./assets/js/stimulsoft.viewer.js";
export default {
  created() {
    // var report = Stimulsoft.Report.StiReport.createNewReport();
    // report.loadFile("http://localhost:8080/reports/Report.mrt");
    window.console.log("Loading Viewer view");

    window.console.log("Creating the report viewer with default options");
    var viewer = new window.Stimulsoft.Viewer.StiViewer(
      null,
      "StiViewer",
      false
    );

    window.console.log("Creating a new report instance");

    var report = new window.Stimulsoft.Report.StiReport();

    window.console.log("Load report from url");
    let mdc_url = sessionStorage.mdc_url;
    report.loadFile(mdc_url);

    window.console.log(
      "Assigning report to the viewer, the report will be built automatically after rendering the viewer"
    );
    viewer.report = report;

    window.console.log("Rendering the viewer to selected element");
    viewer.renderHtml("viewer");

    window.console.log("Loading completed successfully!");
  }
};
</script>

<style>
/* @import url("./assets/css/stimulsoft.viewer.office2013.whiteblue.css"); */
</style>

<style scoped>
</style>