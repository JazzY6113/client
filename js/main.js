// Vue.component('product-review', {
//     template: `
//        <form class="review-form" @submit.prevent="onSubmit">
//        <p v-if="errors.length">
//              <b>Исправьте текущие ошибки:</b>
//              <ul>
//                <li v-for="error in errors">{{ error }}</li>
//              </ul>
//        </p>
//          <p>
//            <label for="name">Имя:</label>
//            <input id="name" v-model="name" placeholder="name">
//          </p>
        
//          <p>
//            <label for="review"Отзыв:</label>
//            <textarea id="review" v-model="review"></textarea>
//          </p>
//          <p>
//            <label for="rating">Рейтинг:</label>
//            <select id="rating" v-model.number="rating">
//              <option>5</option>
//              <option>4</option>
//              <option>3</option>
//              <option>2</option>
//              <option>1</option>
//            </select>
//          </p>
//          <p>
//            <label class="rec">Смогли бы вы порекоментовать этот товар?</label>
//            <input type="radio" id="rec" name="drone" value="Да" v-model="recommended">
//            <label for="rec">Да</label>
//            <input type="radio" id="not_rec" name="drone" value="Нет" v-model="recommended">
//            <label for="not_rec">Нет</label>
//          </p>
//          <p>
//            <input type="submit"> 
//          </p>
//         </form>
        
        
//  `,
//     data() {
//         return {
//             name: null,
//             review: null,
//             rating: null,
//             errors: [],
//             recommended: null,
//         }
//     },
//     methods:{
//         onSubmit() {
//             if(this.name && this.review && this.rating) {
//                 let productReview = {
//                     name: this.name,
//                     review: this.review,
//                     rating: this.rating
//                 }
//                 this.$emit('review-submitted', productReview)
//                 this.name = null
//                 this.review = null
//                 this.rating = null
//             } else {
//                 if(!this.name) this.errors.push("Имя обязательно.")
//                 if(!this.review) this.errors.push("Отзыв обязателен.")
//                 if(!this.rating) this.errors.push("Рейтинг обязателен.")
//             }
//         },
//     }

// })

// Vue.component('product', {
//     template: `
//     <div class="product">
//             <div class="product-image">
//                 <img v-bind:alt="altText" v-bind:src="image">
//             </div>
//             <div class="product-info">
//                 <h1>{{ title }}</h1>
//                 <p>{{description}}</p>
//                 <span >{{ sale }}</span>
//                 <p v-if="inStock" >В наличии</p>
//                 <p v-else :class="{ OutOfStock:!inStock }">Нет в наличии</p>
//                 <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
//                      @mouseover="updateProduct(index)" :style="{ backgroundColor:variant.variantColor }">
//                 </div>
//                 <select>
//                     <option v-for="size in sizes">{{size}}</option>
//                 </select>
//                 <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Добавить в корзину</button>
//                 <button v-on:click="removeToCart">Удалить из корзины</button>
//                 <br>
//                 <a v-bind:href="link">Похожее</a>
//                 <p>User is premium: {{ premium }}</p>
//                 <p>Shipping: {{ shipping }}</p>
//             </div>
//        </div>

//        <product-review @review-submitted="addReview"></product-review>

//        <div>
// <h2>Reviews</h2>
// <p v-if="!reviews.length">There are no reviews yet.</p>
// <ul>
//   <li v-for="review in reviews">
//   <p>{{ review.name }}</p>
//   <p>Rating: {{ review.rating }}</p>
//   <p>{{ review.review }}</p>
//   </li>
// </ul>
// </div>

//   `,
//     data() {
//         return {
//             product: "Носки",
//             brand: 'Vue Mastery',
//             description: "Пара теплых, пушистых носков",
//             selectedVariant: 0,
//             altText: 'Socks',
//             link: "https://www.ozon.ru/category/odezhda-obuv-i-aksessuary-7500/?text=%D0%BD%D0%BE%D1%81%D0%BA%D0%B8&clid=11468697-1",
//             onSale: true,
//             variants: [
//                 {
//                     variantId: 2234,
//                     variantColor: 'green',
//                     variantImage: "./assets/vmSocks-green-onWhite.jpg",
//                     variantQuantity: 10
//                 },
//                 {
//                     variantId: 2235,
//                     variantColor: 'blue',
//                     variantImage: "./assets/vmSocks-blue-onWhite.jpg",
//                     variantQuantity: 0
//                 },
//             ],
//             sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
//             reviews: []
//         }
//     },
//     methods: {
//         addToCart() {
//             this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
//         },             
//         removeToCart(index) {
//             this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId);
//         },
//         updateProduct(index) {
//             this.selectedVariant = index;
//             console.log(index);
//         },
//         addReview(productReview) {
//             this.reviews.push(productReview)
//          }         
//     },
//     computed: {
//         title() {
//             return this.brand + ' ' + this.product;
//         },
//         image() {
//             return this.variants[this.selectedVariant].variantImage;
//         },
//         inStock(){
//             return this.variants[this.selectedVariant].variantQuantity
//         },
//         sale() {
//             if (this.onSale) {
//                 return this.brand + ' ' + this.product + ' ' + 'Есть распродажа';
//             } else {
//                 return this.brand + ' ' + this.product + ' ' + 'Нет распродажи';
//             }
//         },
//         shipping() {
//             if (this.premium) {
//                 return "Free";
//             } else {
//                 return 2.99
//             }
//          }         
//     },
//     props: {
//         premium: {
//             type: Boolean,
//             required: true
//         }
//     }
// })

// Vue.component('product-detail', {
//     template: `
//     <ul>
//         <li v-for="detail in details">{{ detail }}</li>
//     </ul>
//   `,
//     data() {
//         return {
//             details: ['80% хлопок', '20% полиэстер', 'Унисекс'],
//         }
//     }
// })

// let app = new Vue({
//     el: '#app',
//     data: {
//         premium: true,
//         cart: [],
//         review: []
//     },
//     methods: {
//         updateCart(id) {
//             this.cart.push(id);
//         },
//         eraseCart(id) {
//             this.cart.pop(id)
//         }
//     } 
//  }) 




 

    Vue.component('product-review', {
    template: `

    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
    <b>Пожалуйста, исправьте следующую ошибку(и):</b>
    <ul>
    <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>

    <p>
    <label for="name">Имя:</label>
    <input id="name" v-model="name" placeholder="Ванька">
    </p>

    <p>
    <label for="review">Отзыв:</label>
    <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
    <label for="rating">Рейтинг</label>
    <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
    </select>
    </p>
    <p>
    <label>Вы бы порекомендовали этот продукт?</label>
    <label>
        <input type="radio" v-model="recommend" value="yes">Да
    </label>
    <label>
        <input type="radio" v-model="recommend" value="no">Нет
    </label>
    </p>
    <p>
    <input type="submit" value="Submit"> 
    </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null,
        }
    },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
        }
    }
    })

    Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="inStock" >В наличии</p>
            <p v-else :class="{ OutOfStock:!inStock }">Нет в наличии</p>
            <span>{{ sale }}</span>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <select>
                <option v-for="size in sizes">{{size}}</option>
            </select>
            <a v-bind:href="link">Похожее</a>
            <p>Доставка: {{ shipping }}</p>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            ></div>
            
            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Добавить в корзину</button>
            <button v-on:click="removeToCart">Удалить из корзины</button>
        </div>           
        <div>
                <h2>Отзывы</h2>
                <p v-if="!reviews.length">Пока нет отзывов.</p>
                <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Рейтинг: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
                </ul>
            </div> <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data() {
        return {
            product: "Носки",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            description: "Пара теплых, пушистых носков.",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            onSale: true,
            altText: "Пара носков",
            details: ['80% хлопок', '20% полиэстер', 'унисекс'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeToCart(index) {
            this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' ' + 'действует распродажа';
            } else {
                return this.brand + ' ' + this.product + ' ' + 'не действует распродажи';
            }
        },
        shipping() {
            if (this.premium) {
                return "Бесплатно";
            } else {
                return 2.99
            }
        }
    }
    })

    let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        eraseCart(id) {
            this.cart.pop(id);
        }
    }
    })