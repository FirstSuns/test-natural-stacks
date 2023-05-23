var rebuyPopup = new Vue({
    el: "#c-rp",
    data: {
        product: '',
        formData: [],
        showPopup: false,
        data: [],
        originalProdProps: {},
        selectedVariant: []
    },
    methods: {
        addOriginal: function(){
          axios.post('/cart/add.js', this.originalProdProps)
            .then( () => {
                this.goToCart();
            })
      	},
        addNew: function(){
          axios.post('/cart/add.js', {
            	quantity: 1,
                id: this.selectedVariant.variants[0].id,
                properties: {
                    _source: 'Rebuy',
                    _attribution: 'Rebuy Add To Cart'
                }
          })
            .then( () => {
                this.goToCart();
            })
        },
       	addSub: function(props){
  			axios.post('/cart/add.js', props)
            .then( () => {
                this.goToCart();
            })
		},
      	checkout: function(){
            axios.post('/cart/add.js', {
                quantity: 1,
                id: this.selectedVariant.id,
                properties: {
                    _source: 'Rebuy',
                    _attribution: 'Rebuy Add To Cart'
                }

            })
            .then( () => {
                this.goToCart();
            })
        },
        goToCart(){
             window.location.href="/cart"
        },
        checkPopup: function(form, id){
				  this.originalProdProps = form
                  axios.get(`https://rebuyengine.com/api/v1/custom/id/251?shopify_product_ids=${id}&format=pretty&key=Z2R%2FeMgc1nP9iNml9xBcFmy5YjmjhEcIsmGlhqLgxfY5yLZjYwXsfgt5A1L9T2PxzZbwcTXk%2FTHpa8twbAOxjg%3D%3D`)
                .then(function(res){
                    if(res.data.data.length > 0){
                      	var rp = rebuyPopup;
                        rp.showPopup = true;
                        rp.data = res.data.data;
                      	rp.selectedVariant = rp.data[0].variants[0]

                    } else {
                       rebuyPopup.addOriginal();
                    }
                })
        },
        getImage: function(id){
            var images = this.data[0].images
            for(var i = 0; i < images.length; i++){
                if(id == images[i].id){
                    return images[i].src;
                }
            }
        }
    }
})