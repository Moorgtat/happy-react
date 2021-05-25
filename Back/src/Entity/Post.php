<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PostRepository;
use App\Controller\PostPublishController;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PostRepository::class)
* @ApiResource (
 * normalizationContext={
 *      "groups"={"post_collection"}
 *  },
 * collectionOperations={
 *  "get",
 *  "post"={
 *      "denormalization_context"={
 *      "groups"={"put_post"}
 *      }
 *     }
 * },
 * itemOperations={
 *  "publish"={
 *      "method" = "POST",
 *      "path" = "/posts/{id}/publish",
 *      "controller" = PostPublishController::class,
 *      "openapi_context"={
 *          "summary"= "Permets de publier un article online.",
 *          "requestBody"= {
 *              "content"= {
 *                  "application/json"= {
 *                      "schema" = {
 *                          "type"= "object",
 *                          "required"= {}
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      },
 *  "put"={
 *      "denormalization_context"={
 *      "groups"={"put_post"}
 *      }
 *     },
 *  "delete",
 *  "get"={
 *      "normalization_context"={
 *      "groups"={"post_collection","post_item", "post_item_category"}
 *      }
 *     }
 *  }
 * )
 */
class Post
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"post_collection"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"post_collection", "put_post"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"post_collection", "put_post"})
     */
    private $slug;

    /**
     * @ORM\Column(type="text")
     * @Groups({"post_item", "put_post"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"post_item"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"post_item"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="posts")
     * @Groups({"post_collection", "post_item_category", "put_post"})
     */
    private $category;

    /**
     * @ORM\Column(type="boolean", options={"default": "0"})
     * @Groups({"post_collection"})
     */
    private $online = false;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getOnline(): ?bool
    {
        return $this->online;
    }

    public function setOnline(bool $online): self
    {
        $this->online = $online;

        return $this;
    }
}
