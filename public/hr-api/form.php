<?php
// Public: returns the published recruitment form definition.
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') hr_fail('Method not allowed', 405);
hr_json(['ok' => true, 'schema' => hr_public_schema(hr_load_schema())]);
