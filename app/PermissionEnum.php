<?php

namespace App;

enum PermissionEnum: string
{
    case ViewOrders = 'view_orders';
    case CreateOrders = 'create_orders';
    case EditOrders = 'edit_orders';
    case CancelOrders = 'cancel_orders';
    case ViewProducts = 'view_products';
    case CreateProducts = 'create_products';
    case EditProducts = 'edit_products';
    case DeleteProducts = 'delete_products';
    case ViewUsers = 'view_users';
}
