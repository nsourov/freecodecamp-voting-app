const arr = Array.from($('.checkbox').parent());
let id;
arr.map(function(data){
  id = data.dataset.id
})
let option = [];
$.get('/allPolls', function(data){
  const polls = data.find(poll => poll._id === id);
  polls.options.map((data, i) => {
    let newData  = [data.name, data.vote]
    option.push(newData)
  })
})
console.log(option)
google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Polls");
  data.addColumn("number", "vote");
  data.addRows(option);

  var options = {
    width: 800,
    height: 400
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}