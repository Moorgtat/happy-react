<?php

namespace App\TokenEvents;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {
    public function UpdateJwtData(JWTCreatedEvent $event) {
        $user = $event->getUser();
        
        $data = $event->getData();
        
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();

        $event->setData($data);

    }
}