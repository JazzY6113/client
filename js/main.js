Vue.component('product', {
    template: `
    <div class="product">
            <div class="product-image">
                <img v-bind:alt="altText" v-bind:src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{description}}</p>
                <span >{{ sale }}</span>
                <p v-if="inStock" >В наличии</p>
                <p v-else :class="{ OutOfStock:!inStock }">Нет в наличии</p>
                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                     @mouseover="updateProduct(index)" :style="{ backgroundColor:variant.variantColor }">
                </div>
                <select>
                    <option v-for="size in sizes">{{size}}</option>
                </select>
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Добавить в корзину</button>
                <button v-on:click="removeFromCart">Удалить из корзины</button>
                <br>
                <a v-bind:href="link">Похожее</a>
                <p>User is premium: {{ premium }}</p>
                <p>Shipping: {{ shipping }}</p>
            </div>
       </div>
  `,
    data() {
        return {
            product: "Носки",
            brand: 'Vue Mastery',
            description: "Пара теплых, пушистых носков",
            selectedVariant: 0,
            altText: 'Socks',
            link: "https://www.ozon.ru/category/odezhda-obuv-i-aksessuary-7500/?text=%D0%BD%D0%BE%D1%81%D0%BA%D0%B8&clid=11468697-1",
            onSale: true,
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
                },
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },             
        removeFromCart(index) {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' ' + 'Есть распродажа';
            } else {
                return this.brand + ' ' + this.product + ' ' + 'Нет распродажи';
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
         }         
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    }
})

Vue.component('product-detail', {
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
    data() {
        return {
            details: ['80% хлопок', '20% полиэстер', 'Унисекс'],
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
        }
    } 
 }) 