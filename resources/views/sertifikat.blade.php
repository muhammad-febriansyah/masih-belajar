<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat</title>

    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }

        body {
            margin: 0;
            padding: 0;
            background: url('{{ public_path('sertifikat/sertifikat.jpg') }}') no-repeat center center;
            background-size: contain;
            position: relative;
            font-family: Arial, sans-serif;
        }

        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 80%;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
        }

        .name {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="content">
        <div class="title"></div>
        <div class="name text-red-50">hell</div>
        <p>Diberikan kepada Anda sebagai bentuk penghargaan atas prestasi luar biasa.</p>
    </div>
</body>

</html>
