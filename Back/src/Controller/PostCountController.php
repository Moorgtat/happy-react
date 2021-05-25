<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;

class PostCountController
{
    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function __invoke(): int 
    {
        return $this->postRepository->count([]);
    } 
}