<script setup>

    import Producto from '@/Components/Producto.vue';

    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
    import InputError from '@/Components/InputError.vue';
    import TextInput from '@/Components/TextInput.vue';
    import InputLabel from '@/Components/InputLabel.vue';
    import PrimaryButton from '@/Components/PrimaryButton.vue';
    import { useForm, Head } from '@inertiajs/vue3';

    defineProps(['productos']);

    const form = useForm({
        descripcion: '',
        nombre: '',
        precio: '',
        stock: '',
    });
</script>

<template>
    <Head title="Productos" />
 
 <AuthenticatedLayout>
     <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
         <form v-if="$page.props.auth.user.name==='admin'" @submit.prevent="form.post(route('productos.store'), { onSuccess: () => form.reset() })">
            <InputLabel for="nombre" value="Nombre" />
                <TextInput
                    id="nombre"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.nombre"
                    required
                />
             <textarea
                 v-model="form.descripcion"
                 placeholder="Decripción"
                 class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
             ></textarea>
             <InputLabel for="precio" value="Precio $" />
                <TextInput
                    id="precio"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.precio"
                    required
                />
                <InputLabel for="stock" value="Stock" />
                <TextInput
                    id="stock"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.stock"
                    required
                />
             <InputError :message="form.errors.message" class="mt-2" />
             <PrimaryButton class="mt-4">Nuevo Producto</PrimaryButton>
         </form>

         <div class="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <Producto
                    v-for="producto in productos"
                    :key="producto.id"
                    :producto="producto"
                />
        </div>

     </div>
 </AuthenticatedLayout>
</template>