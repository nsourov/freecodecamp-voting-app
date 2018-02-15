const arr = Array.from($('.checkbox').parent());
let id;
arr.map(function(data){
  id = data.dataset.id
})
let option = [];
fetch('/allPolls')
  .then(res => res.json())
  .then(data => {
    let polls = data.find(poll => poll._id === id);
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
    setTimeout(function() {
      $('.loader').hide();
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Polls");
      data.addColumn("number", "vote");
      data.addRows(option);
      let width = window.innerWidth - 30
      var options = {
        width,
        height: 400,
      };
    
      var chart = new google.visualization.PieChart(
        document.getElementById("chart_div")
      );
      chart.draw(data, options);
    }, 2000)
  }