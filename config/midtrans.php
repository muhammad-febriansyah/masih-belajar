<?php

return [
    'server_key' => env('MIDTRANS_SERVERKEY'),
    'client_key' => env('MIDTRANS_CLIENTKEY'),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'url' => env('MIDTRANS_IS_PRODUCTION', false)
        ? 'https://app.midtrans.com/snap/v2/transactions'
        : 'https://app.sandbox.midtrans.com/snap/v2/transactions',
];
