// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    register: 'http://localhost:5000/api/v1/auth/register',
    login: 'http://localhost:5000/api/v1/auth/login',
    recoveryPassword: 'http://localhost:5000/api/v1/auth/recoveryPassword',
    restorePassword: 'http://localhost:5000/api/v1/auth/restorePassword',
    getIdByToken: 'http://localhost:5000/api/v1/auth/getIdByToken',
    verifyAuth: 'http://localhost:5000/api/v1/auth/verifyAuth',
    verifyAdminAuth: 'http://localhost:5000/api/v1/auth/verifyAdminAuth',
    verifyEncodeToken: 'http://localhost:5000/api/v1/auth/verifyEncodeToken',
  },
  user: {
    getUserList: 'http://localhost:5000/api/v1/users/getUserList',
    getUserById: 'http://localhost:5000/api/v1/users/getUserById',
    updateUser: 'http://localhost:5000/api/v1/users/updateUser',
    changePasswordUser: 'http://localhost:5000/api/v1/users/changePasswordUser',
    setUser: 'http://localhost:5000/api/v1/users/setUser',
    getAllDataUserById: 'http://localhost:5000/api/v1/users/getAllDataUserById',
    updateAllDataUser: 'http://localhost:5000/api/v1/users/updateAllDataUser',
  },
  product: {
    productList: 'http://localhost:5000/api/v1/products/productList',
    getProductById: 'http://localhost:5000/api/v1/products/getProductById',
    getProductByCategoryId: 'http://localhost:5000/api/v1/products/getProductByCategoryId',
    getFeaturedProducts: 'http://localhost:5000/api/v1/products/getFeaturedProducts',
    getFeaturedProductByCategoryId:
      'http://localhost:5000/api/v1/products/getFeaturedProductByCategoryId',
    getLatestProductInEachCategoryByLimit:
      'http://localhost:5000/api/v1/products/getLatestProductInEachCategoryByLimit',
    getProductsListSortBy: 'http://localhost:5000/api/v1/products/getProductsListSortBy',
    getProductsListPagination: 'http://localhost:5000/api/v1/products/getProductsListPagination',
    getProductsByName: 'http://localhost:5000/api/v1/products/getProductsByName',
    getProductsListByCategoryIdPagination:
      'http://localhost:5000/api/v1/products/getProductsListByCategoryIdPagination',
    setProduct: 'http://localhost:5000/api/v1/products/setProduct',
    updateProduct: 'http://localhost:5000/api/v1/products/updateProduct',
    mainImage: {
      setMainImage: 'http://localhost:5000/api/v1/mainProductsImage/setMainImage',
      updateMainImage: 'http://localhost:5000/api/v1/mainProductsImage/updateMainImage',
    },
    restImage: {
      setRestImage: 'http://localhost:5000/api/v1/restProductsImage/setRestImage',
      updateRestImage: 'http://localhost:5000/api/v1/restProductsImage/updateRestImage',
    },
  },
  category: {
    getCategoriesList: 'http://localhost:5000/api/v1/categories/getCategoriesList',
    getCategoriesListIncludeDeleted:
      'http://localhost:5000/api/v1/categories/getCategoriesListIncludeDeleted',
    setCategory: 'http://localhost:5000/api/v1/categories/setCategory',
    getCategoryById: 'http://localhost:5000/api/v1/categories/getCategoryById',
    deleteCategory: 'http://localhost:5000/api/v1/categories/deleteCategory',
    restoreCategory: 'http://localhost:5000/api/v1/categories/restoreCategory',
    updateCategory: 'http://localhost:5000/api/v1/categories/updateCategory',
  },
  order: {
    getOrdersList: 'http://localhost:5000/api/v1/orders/getOrdersList',
    setOrder: 'http://localhost:5000/api/v1/orders/setOrder',
    getOrdersByUserId: 'http://localhost:5000/api/v1/orders/getOrdersByUserId',
    deleteOrder: 'http://localhost:5000/api/v1/orders/deleteOrder',
    restoreOrder: 'http://localhost:5000/api/v1/orders/restoreOrder',
  },
  role: {
    getRolesList: 'http://localhost:5000/api/v1/roles/getRolesList',
    getRolesListEnabled: 'http://localhost:5000/api/v1/roles/getRolesListEnabled',
    getRoleById: 'http://localhost:5000/api/v1/roles/getRoleById',
    setRole: 'http://localhost:5000/api/v1/roles/setRole',
    updateRole: 'http://localhost:5000/api/v1/roles/updateRole',
    deleteRole: 'http://localhost:5000/api/v1/roles/deleteRole',
    restoreRole: 'http://localhost:5000/api/v1/roles/restoreRole',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
