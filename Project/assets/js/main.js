function copytext(el) {
	var tmp = document.getElementById(el);
    tmp.select();
    document.execCommand("copy");
}    

function cleartext(el) {
	var tmp = document.getElementById(el);
    tmp.value=null;
}    

function clearalltext(el1,el2) {
	var tmp1 = document.getElementById(el1);
	var tmp2 = document.getElementById(el2);
    tmp1.value=null;
    tmp2.value=null;
}  

$(".ripple").on("click",function(event){
$(this).append("<span class='ripple-effect'>");
$(this).find(".ripple-effect").css({
   left:event.pageX-$(this).position().left,
    top:event.pageY-$(this).position().top
  }).animate({
    opacity: 0,
  }, 1500, function() {
   $(this).remove();
  });
});

function edit_text() {
    alert("Выполнение");
	var tmp = document.getElementById('textarea2');
    tmp.value=null;
	var count_str = 0;
	var myList = document.getElementById('textarea1').value.split('\n');
	var newList = myList;
	for (var i = 0, ln = myList.length; i < ln; i++)
		{
			newList[i] = myList[i].replace(/{/g,'\n'+'{'+'\n');
		}
	myList = newList;
	for (var i = 0, ln = myList.length; i < ln; i++)
		{
			newList[i] = myList[i].replace(/}/g,'\n'+'}'+'\n');
		}
	myList = newList;
	for (var i = 0, ln = myList.length; i < ln; i++)
		{
			newList[i] = myList[i].replace(/;/g,';'+'\n');
		}
	myList = newList.join('');
	newList = myList.split('\n');
	var select_tab_element = document.getElementById('Select_Tab');
	var select_tab = select_tab_element.options[select_tab_element.selectedIndex].value;
	var area = document.getElementById('textarea2');
            var otstup = 0;
			
			for (var i = 0, ln = newList.length; i < ln; i++)
			{
				var line = newList[i];
				line = line.trim();
					if (line[0] == '}') 
					{ 
						otstup--; 
						for (var j = 0; j < otstup; j++) 
						{
							area.value += select_tab;
						}
						area.value += line + '\n';
						count_str++;
					}
					else if (line[0] == '{') 
							{
								for (var j = 0; j < otstup; j++) 
								{
									area.value += select_tab;
								}
								area.value += line + '\n';
								otstup++;
								count_str++;
							}
					else if (line[0] == null){}
					else
					{
						for (var j = 0; j < otstup; j++) 
						{
							area.value += select_tab;
						}
						area.value += line + '\n';
						count_str++;
					}
			}
			var str = area.value;
			str = str.replace (/\n/g, '');
			document.getElementById('symb1').innerHTML = str.length;
			str = str.replace (/\s/g, '');
			document.getElementById('symb2').innerHTML = str.length;
			document.getElementById('symb3').innerHTML = count_str.toString();
			document.getElementById('textarea2').value = area.value;
}   

//Вешаем функцию на обработку формы
 $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // Применяем ко всем input

      var i = $(this); // Выбранный input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // Флаг ошибки выбранного input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // Применяем ко всем textarea

      var i = $(this); // Выбранный textarea
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'assets/sendmail.php';
    }
	//Отправка
	var name = $('input[name=name]').val();
	var mail = $('input[name=mail]').val();
	var sub = $('input[name=sub]').val();
	var message = $('textarea[name=message]').val();
	dannie = {'name':name, 'mail':mail, 'sub':sub, 'message':message};
    $.post('assets/sendmail.php', dannie, function(otvet){
		document.querySelector('.form_result').innerHTML = otvet.text;
		}, 'json');
    return false;
  });