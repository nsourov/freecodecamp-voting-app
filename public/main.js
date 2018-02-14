$(document).ready(function() {
  $(".close.icon").on("click", function() {
    $(this)
      .parent()
      .transition("fade");
  });
  $(".add").on("click", function() {
    const html = `<div class="field">
    <label><h3 class="ui grey header">Poll option</h3></label>
     <input type="text" name="option[]">
   </div>`;
    $(".poll-form").append(html);
  });
  $(".ui.dropdown").dropdown();
  $(".ui.accordion").accordion();
  $(".ui.radio.checkbox").checkbox();
  $(".ui.form").form({
    fields: {
      vote: {
        identifier: 'vote',
        rules: [{
          type: 'checked',
          prompt: 'Please Select An Option!'
        }]
      },
      pollname: {
        identifier: 'pollname',
        rules: [{
          type: 'empty',
          prompt: 'Please enter poll name'
        }]
      },
      option: {
        identifier: 'option[]',
        rules: [{
          type: 'empty',
          prompt: 'Please enter poll options'
        }]
      },
      username: {
        identifier: "username",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your username"
          }
        ]
      },
      password: {
        identifier: "password",
        rules: [
          {
            type: "empty",
            prompt: "Please enter your password"
          },
          {
            type: "length[6]",
            prompt: "Your password must be at least 6 characters"
          }
        ]
      }
    }
  });
});
// Navbar
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }