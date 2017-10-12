
var Client = Backbone.Model.extend({
		idAttribute: "Client_ID",
		urlRoot: 'http://127.0.0.1:3000/client/'
	});

function Ajax_Call(url, verb, json_data, func_Success) {
	$.ajax({
		type: verb,
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		url: url,
		data: json_data,
		success: function (data, textStatus, jqXHR) {
			//Do stuff with the JSON data
			func_Success(data);
		},
		error: function (data, textStatus, jqXHR) {
			console.log("error");
		}
	});
}
Ajax_Call('http://127.0.0.1:3000/client/', 'PATCH', {}, function (data) {

	if ($.type(data) === "array") {
		var dataItem;
		var props = '',
		html = '';
		for (var r = 0; r < data.length; r++) {

			dataItem = data[r].props;

			console.log(props);
			for (var i = 0; i < dataItem.length; i++) {
				props += "<div class=\"form-group\">";
				props += "  <label>" + dataItem[i].descript + "</label> ";
				props += "  <input data-key='" + dataItem[i].key + "' data-section='" + data[r].key + "' type=\"text\" id=\"txt" + dataItem[i].key + "\"  placeholder=\"" + dataItem[i].descript + "\" class=\"data-items " + data[r].key + " form-control\">";
				props += "</div>";
			}

			console.log(props);
			html += "<div class=\"panel panel-default\">" +
			"   <div class=\"panel-heading\">" + data[r].descript + "</div>" +
			"   <div class=\"panel-body\">" +
			props +
			"      <div>" +
			"      </div>" +
			"   </div>" +
			"</div>";
			props = '';
		}
		//console.log(html);
		$("#frmClientAdd").html(html + "<button onclick='saveItem()' class=\"btn btn-sm btn-primary pull-right m-t-n-xs\" type=\"submit\"><strong>Save</strong></button>");
	}
});

function search() {
	Ajax_Call('http://127.0.0.1:3000/client/', 'GET', {}, function (data) {

		/*
		<tr class="gradeX">
		<td>Trident</td>
		<td>Internet
		Explorer 4.0
		</td>
		<td>Win 95+</td>
		<td class="center">4</td>
		<td class="center">X</td>
		</tr>


		<th>First Name</th>
		<th>Last Name</th>
		<th>Middle Name</th>
		<th>Cell Number</th>
		<th>Data Signed Up</th>
		 */
		if (data.count > 0) {
			var html = '';
			console.log(data.items);
			for (var i = 0; i < data.items.length; i++) {
				html += '<tr class="gradeX">';
				html += '<th>'+data.items[i].First_Name+'</th>';
				html += '<th>'+data.items[i].First_Name+'</th>';
				html += '<th>'+data.items[i].Middle_Name+'</th>';
				html += '<th>'+data.items[i].Cell_Mobile_Phone_Number+'</th>';
				html += '<th>'+data.items[i].Date_Became_Customer+'</th>';
				html += '</tr>';
			}
			$("#tbData").html(html);
		}
	});
}
search();
function saveItem() {
	var dataItems = [];
	var groupedDataItems = [];
	var finalJSONString = "";
	var json = {};
	$(".data-items").each(function () {
		console.log($(this).val());
		dataItems.push({
			section: $(this).attr("data-section"),
			key: $(this).attr("data-key"),
			value: $(this).val()
		});
	});
	groupedDataItems = _.groupBy(dataItems, 'section');
	var keys = Object.keys(groupedDataItems);
	for (var i = 0; i < keys.length; i++) {
		json[keys[i]] = new Object();
		for (var j = 0; j < groupedDataItems[keys[i]].length; j++) {
			json[keys[i]][groupedDataItems[keys[i]][j].key] = groupedDataItems[keys[i]][j].value;
		}
	}
	console.log(JSON.stringify(json));
	Ajax_Call('http://127.0.0.1:3000/client/', 'POST', JSON.stringify(json), function (data) {
		console.log(data);
	});
}
