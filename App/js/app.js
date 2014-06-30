d3.json("data/db.json", function(data) {
		data = data.data;

		console.log(data);

		d3.select(".form-control")
			.on('keyup', function(d, i) {
				var s = this.value;
				console.log(s);

				d3.selectAll(".col")
					.classed("hide",function(d){
						var f = 0;
						for (i in d){
							f += d[i].indexOf(s) > -1 ? 1 : 0;
						}
						
						return f>0 ? false: true;
					})
			})

		d3.select(".sidebar").selectAll(".jump")
			.data(data)
			.enter()
			.append("li")
			.attr("class", "jump")
			.append("a")
			.attr("href", function(d){
				return "#"+d.Thema;
			})
			.text(function(d){
				return d.Thema;
			})

		var containter = d3.select(".liste");

		var liste = containter.selectAll(".row").data(data)

		var themen = liste.enter()
			.append("div").attr("class", "row")
		
		themen
			.append("div")
			.attr("class","pbl")
			.attr("id", function(d){
				return d.Thema;
			})


		themen
			.append("h4").text(function(d){
				return d.Thema;
			})


		var item = themen
			.append("div")
			.attr("class", "tiles")
			.selectAll(".col")
				.data(function(d){ return d.Literatur; })
				.enter()
					.append("div").attr("class", "col")
					.append("div").attr("class", "tile")

		item
			.append("img").attr("class", "img-responsive title-img")
			.attr("src", function(d){ 
				if(d["ISBN-10"] ) return "http://images.amazon.com/images/P/"+d["ISBN-10"]+".01.LZZZZZZZ.jpg";
				else if(d.ASIN ) return "http://images.amazon.com/images/P/"+d.ASIN+".01.LZZZZZZZ.jpg";
				else if(d.ISBN ) return "http://covers.openlibrary.org/b/isbn/"+d.ISBN+"-L.jpg";
				else return "images/icons/svg/book.svg";
			})
			.style("display", function(d){
				return (d.ISBN || d["ISBN-10"] || d.ASIN) ? "inline":"none";
			})

		item
			.append("h3").attr("class", "tile-title")
			.text(function(d){ return d.Titel; })

		item
			.append("p")
			.html(function(d){
				var o = "";
				for(i in d){
					if(i!="Titel"){
						o += i +": "+ d[i] +"<br>";
					}
					
				}
				return o;
			})

});