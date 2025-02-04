    let eventBus = new Vue()

    eventBus.$on('review-submitted', function (productReview) {
        this.reviews.push(productReview)
    }.bind(this))
    
    Vue.component('product-tabs', {
        props: {
            reviews: {
                type: Array,
                required: false
            },
            shippingCost: {
                type: String,
                required: true
            },
            details: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
                selectedTab: 'Reviews'
            }
        },
        template: `
            <div>   
                <ul>
                    <span class="tab"
                        :class="{ activeTab: selectedTab === tab }"
                        v-for="(tab, index) in tabs"
                        @click="selectedTab = tab"
                    >{{ tab }}</span>
                </ul>
                <div v-show="selectedTab === 'Reviews'">
                    <p v-if="!reviews.length">Пока нет отзывов.</p>
                    <ul>
                        <li v-for="review in reviews" :key="review.name">
                            <p>{{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                        </li>
                    </ul>
                </div>
                <div v-show="selectedTab === 'Make a Review'">
                    <product-review></product-review>
                </div>
                <div v-show="selectedTab === 'Shipping'">
                    <p>Стоимость доставки: {{ shippingCost }}</p>
                </div>
                <div v-show="selectedTab === 'Details'">
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>
                </div>
            </div>
        `,
        methods: { 
        }
    });

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
            this.errors = [];

            if (this.rating && this.rating < 3) {
                this.errors.push("Оценка должна быть 3 или выше, чтобы оставить отзыв.");
                return;
            }

            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Требуется имя.")
                if(!this.review) this.errors.push("Требуется комментарий.")
                if(!this.rating) this.errors.push("Требуется оценка.")
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
                <div class="product-color">
                <div
                        class="color-box"
                        v-for="(variant, index) in variants"
                        :key="variant.variantId"
                        :style="{ backgroundColor:variant.variantColor }"
                        @mouseover="updateProduct(index)"
                ></div>
                </div>
                
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Добавить в корзину</button>
                <button v-on:click="removeToCart">Удалить из корзины</button>
            </div>           
            <div>
                <product-tabs 
                    :reviews="reviews" 
                    :shipping-cost="shipping" 
                    :details="details"
                    @review-submitted="addReview">
                </product-tabs>
            </div>
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
                    return "2.99$";
                }
            }
        },
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }     
    });

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