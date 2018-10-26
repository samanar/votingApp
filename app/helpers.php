<?php

function status_string($status)
{
    if ($status == 0)
        return "<div class='text-secondary'>در حال برگزاری</div>";
    return "<div class='text-primary'>پایان یافته</div>";
}