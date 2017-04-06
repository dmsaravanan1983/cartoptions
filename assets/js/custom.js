$(document).ready(function() {
    var jurl= "/getData";
        $.ajax({
                type: "get",
          contentType: "application/json; charset=utf-8",
          url: jurl,
          data: "{}",
          dataType: "json",
          success: function (data) {
            var dataContent = data.result;
           
            var prodList='';
            
           $.each(dataContent.productList, function(i, item) {
               
                prodList += '<li class="col-md-3 col-sm-12 listProd" card="'+i+'" id="' + dataContent.productList[i].productId + '"> <div class="my-col">';
                prodList += '		 <div class="img-thumb col-md-12 col-sm-4 col-xs-4"><img class="img-resposive" src="' + dataContent.productList[i].imageUrls.sm + '" alt="product-detail"></div>';
                prodList += '		<div class="col-md-12 col-sm-8 col-xs-8">';
                prodList += '			<p class="text">' + dataContent.productList[i].brand+ ' '+ dataContent.productList[i].description + '</p>';
                prodList += '			<p class="price">$' + dataContent.productList[i].pricing.price.selling + '</p>';
                prodList += '			<button class="btn-white">VIEW MORE</button>';
                prodList += '		</div> </div>';
                prodList += '</li>';
               
           });
              
              var heroLoad = function(productNum){
               console.log(productNum + '...........productNum');
                  var datalistHero='';
                  for(i=0; i<4; i++){
               if(dataContent.productList[productNum].marketingBullets[i] != undefined){
               datalistHero += '<li>'+dataContent.productList[productNum].marketingBullets[i]+'</li>';
                   }
                  }
                  
               var heroData='';
               heroData += '<div class="hero row"><div class="col-md-3 img-cont">';
               heroData += '<img class="img-resposive" src="' + dataContent.productList[productNum].imageUrls.md + '" alt="product-detail"> </div>';
               heroData += '<div class="col-md-6 product-info">';
               heroData += '<h2>' + dataContent.productList[productNum].brand+ ' '+ dataContent.productList[productNum].description + '</h2>';
               heroData += '<ul id="deslist">'+datalistHero+'</ul>';
               heroData += '</div><div class="col-md-3">';
               heroData += '<p class="price-tag">' + dataContent.productList[productNum].pricing.price.selling + '</p>';
               heroData += '<button class="btn-green" onclick="alert('+dataContent.productList[productNum].pricing.price.selling+');">ADD TO CART</button></div></div>';
                  return heroData;
                   
                  }
              
               $('#productCount').html(prodList);

              $(".listProd").mouseenter(function(e){
                  showSubMenu(this);   
                });
              
              function showSubMenu(menu) {
                //console.log($(menu).attr('card')); //Alerts undefined
                  var heroDataLoad = heroLoad($(menu).attr('card'));
                    //var heroDataLoad = heroLoad(productNum);
                     $('#hero').html(heroDataLoad);
            }
          }
         });    
    });
