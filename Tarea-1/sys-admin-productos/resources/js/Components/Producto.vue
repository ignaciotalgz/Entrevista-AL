<script setup>

    import Dropdown from '@/Components/Dropdown.vue';
    import DropdownLink from '@/Components/DropdownLink.vue';
    import InputError from '@/Components/InputError.vue';
    import PrimaryButton from '@/Components/PrimaryButton.vue';
    import TextInput from '@/Components/TextInput.vue';
    import InputLabel from '@/Components/InputLabel.vue';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import { useForm } from '@inertiajs/vue3';
    import { ref } from 'vue';

    dayjs.extend(relativeTime);

    const props = defineProps(['producto']);
 
    const form = useForm({
        descripcion: props.producto.descripcion,
        nombre: props.producto.nombre,
        precio: props.producto.precio,
        stock: props.producto.stock,
    });
 
    const editing = ref(false);

</script>

<template>
    <div class="p-6 flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6 w-6 text-gray-600 -scale-x-100">
            <path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z"/>
        </svg>
        <div class="flex-1">
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-gray-800">{{ producto.nombre }}</span>
                    <small class="ml-2 text-sm text-gray-600">{{ dayjs(producto.created_at).fromNow() }}</small>
                    <small v-if="producto.created_at !== producto.updated_at" class="text-sm text-gray-600"> &middot; edited</small>
                </div>
                <Dropdown v-if="$page.props.auth.user.name==='admin'">
                    <template #trigger>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                    </template>
                    <template #content>
                        <button class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" @click="editing = true">
                            Edit
                        </button>
                        <DropdownLink as="button" :href="route('productos.destroy', producto.id)" method="delete">
                            Delete
                        </DropdownLink>
                    </template>
                </Dropdown>
            </div>
            <form v-if="editing" @submit.prevent="form.put(route('productos.update', producto.id), { onSuccess: () => editing = false })">
                <TextInput
                    id="nombre"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.nombre"
                    required
                />
                <InputLabel for="descripcion" value="Descripción" class="mt-4"/>
                <textarea v-model="form.descripcion" class="w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" id="descripcion"></textarea>
                <InputLabel for="precio" value="Precio" class="mt-4"/>
                <TextInput
                    id="precio"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.precio"
                    required
                />
                <InputLabel for="stock" value="Stock" class="mt-4"/>
                <TextInput
                    id="stock"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.stock"
                    required
                />
                <InputError :message="form.errors.message" class="mt-2" />
                <div class="space-x-2">
                    <PrimaryButton class="mt-4">GUARDAR</PrimaryButton>
                    <button class="mt-4" @click="editing = false; form.reset(); form.clearErrors()">Cancel</button>
                </div>
            </form>
            <p v-else class="mt-4 text-lg text-gray-900">
                <div class="mb-2 ">
                    {{ producto.descripcion }}
                </div>
                <div class="flex justify-around">
                    <div>$ {{ producto.precio }}</div>
                    <div>Unidades restantes {{ producto.stock }}</div>
                </div>
            </p>
        </div>
    </div>
</template>