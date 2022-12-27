<?php

namespace App\Helper;

use Illuminate\Support\Str;

Trait Tokenable 
{
    public function makeAuthApiToken()
    {
        $token = Str::random(60);

        $this->api_token = $token;
        $this->save();

        return $this;
    }
}